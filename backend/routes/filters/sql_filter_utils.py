def filter_like(column, value):
    """Creates a SQL condition using LIKE."""
    return f"{column} LIKE '%{value}%'"

def filter_categorical(column, value, allowed_values):
    """
    Creates a SQL condition for categorical values.
    Handles both single values and lists of values.
    """
    if isinstance(value, list):
        # Filter by multiple values using IN
        valid_values = [v for v in value if v in allowed_values]
        if valid_values:
            return filter_in(column, valid_values)
    elif value in allowed_values:
        # Filter by a single value
        return f"{column} = '{value}'"
    return ""

def filter_numeric(column, value):
    """Creates a SQL condition for numeric comparisons."""
    if ">" in value or "<" in value or "=" in value:
        return f"{column} {value}"
    return ""

def filter_null(column):
    """Creates a SQL condition for NULL values."""
    return f"{column} IS NULL"

def filter_in(column, values):
    """Creates a SQL condition using IN for multiple values."""
    formatted_values = ", ".join(f"'{v}'" for v in values)
    return f"{column} IN ({formatted_values})"

def filter_query_with_functions(base_query, filters, unique_values):
    """
    Adds WHERE conditions to the base SQL query using specific filter functions.

    Parameters:
    - base_query (str): The base SQL query.
    - filters (dict): A dictionary where keys are column names and values are filter criteria.
    - unique_values (dict): A dictionary of unique possible values for categorical columns.

    Returns:
    - str: The updated SQL query with the WHERE clause.
    """
    if not filters:  # If no filters, return the base query unchanged
        return base_query.rstrip(";") + ";"

    conditions = []

    # Apply filters based on column logic
    for column, value in filters.items():
        if column in ["title", "tutor_name"]:
            # Use LIKE for title and tutor_name
            conditions.append(filter_like(column, value))
        elif column in ["platform_name", "difficulty_level", "location"]:
            # Use categorical filtering
            allowed_values = unique_values.get(column, [])
            condition = filter_categorical(column, value, allowed_values)
            if condition:
                conditions.append(condition)
        elif column == "price":
            # Categorical value for 'free' or 'paid'
            if len(value) == 2:
                continue
            if value[0] == "free":
                conditions.append(filter_categorical(column, value, ["free"]))
            else:
                updated_q ="price not in ('free');"
                conditions.append(updated_q)
        elif column == "rating" or column == "num_enrollments":
            # Numeric comparisons
            value = value[0]
            conditions.append(filter_numeric(column, value))
        elif column == "Mode":
            # Categorical value for 'online' or 'offline'
            conditions.append(filter_categorical(column, value, ["online", "offline"]))
        elif column == "offering_type":
            # Categorical value for 'db1', 'db2', 'db3'
            conditions.append(filter_categorical(column, value, ["db1", "db2", "db3","db4"]))
        elif column == "certifications":
            # Categorical value for 'yes' or 'no'
            conditions.append(filter_categorical(column, value, ["yes", "no"]))

    # Remove empty conditions and build the WHERE clause
    conditions = [cond for cond in conditions if cond]
    where_clause = " WHERE " + " AND ".join(conditions) if conditions else ""

    # Check if the base query already has a WHERE clause
    if "WHERE" in base_query.upper():
        base_query = base_query.rstrip(";")
        updated_query = f"{base_query} AND {where_clause[7:]} ORDER BY rating desc;"
    else:
        updated_query = base_query.rstrip(";") + where_clause + " ORDER BY rating desc;"
    # print("\n\n\n",updated_query)
    return updated_query
