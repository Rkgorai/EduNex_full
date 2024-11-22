# Import the functions from the file
from sql_filter_utils import filter_query_with_functions

# Define a base SQL query
base_query = '''SELECT offering_id, title, tutor_name, platform_name, difficulty_level, price, rating, description, Mode, num_enrollments, offering_type, location, certifications
    FROM (
        SELECT subject_id AS offering_id, 
               course_name AS title, 
               name AS tutor_name, 
               'nptel' AS platform_name, 
               'unknown' AS difficulty_level, 
               'free' AS price, 
               'null' AS rating, 
               abstract AS description, 
               'online' AS Mode, 
               enrolled_role_student AS num_enrollments, 
               'db3' AS offering_type, 
               'remote' AS location, 
               'yes' AS certifications 
        FROM nptel.course c 
        JOIN nptel.tutors t ON c.tutor_id = t.tutor_id
    ) AS course_tutors 
    '''

# Define filter criteria
filters = {
    "title": "Web",  # Use LIKE
    "platform_name": "Udemy",  # Categorical
    "difficulty_level": "beginner",  # Categorical
    "price": "free",  # Categorical
    "rating": ">4.5",  # Numeric comparison
    "Mode": "online",  # Categorical
    "num_enrollments": ">1000",  # Numeric comparison
    "offering_type": "db3",  # Categorical
    "location": "remote",  # Categorical
    "certifications": "yes"  # Categorical
}

# Unique values for categorical columns
unique_values = {
    "platform_name": ["Coursera", "Udemy", "edX", "Skillshare"],
    "difficulty_level": ["beginner", "intermediate", "advanced"],
    "location": ["remote", "onsite", "hybrid"]
}

# Apply filters to the query
filtered_query = filter_query_with_functions(base_query, filters, unique_values)

# Print the resulting query
print("Filtered Query:")
print(filtered_query)
