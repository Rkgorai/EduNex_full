import mysql.connector

# List of database configurations
db_configs = [
    {
        'host': '192.168.42.192',
        'user': 'root',
        'password': 'root',
        'database': 'tutordb',
    },

    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'skill_course_database',
    },
    {
        'host': '192.168.41.247',
        'user': 'root',
        'password': 'Khan7896',
        'database': 'nptel',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'db4',
    }
]

# Function to create a database connection from a config
def create_connection(config):
    try:
        connection = mysql.connector.connect(
            host=config['host'],
            user=config['user'],
            password=config['password'],
            database=config['database']
        )
        if connection.is_connected():
            return True, None
    except mysql.connector.Error as err:
        return False, str(err)
    finally:
        if 'connection' in locals() and connection.is_connected():
            connection.close()


queries = [
    '''SELECT offering_id, title, tutor_name, platform_name, difficulty_level, price, rating, description, Mode, num_enrollments, offering_type, location, certifications
    FROM (
        SELECT c.centre_id AS offering_id,  -- Use alias 'c' for 'coaching_center'
            t.subject_specialization AS title, 
            CONCAT(t.first_name, ' ', t.last_name) AS tutor_name,  -- Added concatenation for tutor name
            c.name AS platform_name, 
            'unknown' AS difficulty_level, 
            'paid' AS price, 
            c.rating,  -- Prefix column with 'c' for 'coaching_center'
            NULL AS description, 
            'offline' AS Mode, 
            NULL AS num_enrollments, 
            'db1' AS offering_type, 
            c.location,  -- Prefix column with 'c' for 'coaching_center'
            'no' AS certifications 
        FROM coaching_center c 
        JOIN table_tutor t ON c.centre_id = t.centre_id  -- Prefix 'centre_id' with table alias 'c'
    ) AS coaching_tutors
    ''',

    '''SELECT offering_id, title, tutor_name, platform_name, difficulty_level, price, rating, description, Mode, num_enrollments, offering_type, location, certifications
    FROM (
        SELECT course_id AS offering_id, 
               course_name AS title, 
               tutor_name, 
               platform_name, 
               difficulty_level, 
               price, 
               rating, 
               description, 
               Mode, 
               num_enrollments, 
               'db2' AS offering_type, 
               'remote' AS location, 
               'yes' AS certifications 
        FROM skill_course_database.courses
    ) AS skill_course_tutors 
    ''',

    '''SELECT offering_id, title, tutor_name, platform_name, difficulty_level, price, rating, description, Mode, num_enrollments, offering_type, location, certifications
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
    ''',

    '''SELECT offering_id, title, tutor_name, platform_name, difficulty_level, price, rating, description, Mode, num_enrollments, offering_type, location, certifications
    FROM (
        SELECT CONCAT(offering_type, ' ', id) AS offering_id, 
               title AS title, 
               'Null' AS tutor_name, 
               'hackathon' AS platform_name, 
               'unknown' AS difficulty_level, 
               'paid' AS price, 
               rating, 
               link AS description, 
               platform AS Mode, 
               NULL AS num_enrollments, 
               'db4' AS offering_type, 
               location, 
               'yes' AS certifications 
        FROM db4.hackathon 
        UNION 
        SELECT CONCAT(offering_type, ' ', id) AS offering_id, 
               title AS title, 
               'Null' AS tutor_name, 
               'webinar' AS platform_name, 
               'unknown' AS difficulty_level, 
               'paid' AS price, 
               rating, 
               link AS description, 
               platform AS Mode, 
               NULL AS num_enrollments, 
               'db4' AS offering_type, 
               location, 
               'yes' AS certifications 
        FROM db4.webinar
    ) AS hackathon_webinar_table
    '''
]
