import mysql.connector

# List of database configurations
db_configs = [
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'nptel',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'skill_course_database',
    },
    {
        'host': '192.168.42.218',
        'user': 'root',
        'password': 'rahul',
        'database': 'tutordb',
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


# queries = [
#     "SELECT subject_id AS offering_id, course_name AS title, name AS tutor_name, 'nptel' AS platform_name, 'unknown' AS difficulty_level, 'free' AS price, rating, abstract AS description, 'online' AS Mode, enrolled_role_student AS num_enrollments, 'db3' AS offering_type, 'remote' AS location, 'yes' AS certifications FROM (SELECT * FROM course c JOIN tutors t ON c.tutor_id = t.tutor_id)",

#     "SELECT course_id AS offering_id, course_name AS title, tutor_name, platform_name, difficulty_level, price, rating, description, mode, num_enrollments, 'db2' AS offering_type, 'remote' AS location, 'yes' AS certifications FROM courses",

#     "SELECT center_id AS offering_id, subject_specialisation AS title, tutor_name, centre_name AS platform_name, 'unknown' AS difficulty_level, paid AS price, rating, NULL AS description, 'offline' AS Mode, NULL AS num_enrollments, 'db1' AS offering_type, location, 'no' AS certifications FROM (SELECT * FROM coaching_center c JOIN table_tutor t ON c.centre_id = t.centre_id)"
# ]

queries = [
    "SELECT subject_id AS offering_id, course_name AS title, name AS tutor_name, 'nptel' AS platform_name, 'unknown' AS difficulty_level, 'free' AS price, 'null' AS rating, abstract AS description, 'online' AS Mode, enrolled_role_student AS num_enrollments, 'db3' AS offering_type, 'remote' AS location, 'yes' AS certifications FROM (SELECT subject_id, course_name, name, abstract, enrolled_role_student FROM nptel.course c JOIN nptel.tutors t ON c.tutor_id = t.tutor_id) AS course_tutors;",
    "SELECT course_id AS offering_id, course_name AS title, tutor_name, platform_name, difficulty_level, price, rating, description, mode, num_enrollments, 'db2' AS offering_type, 'remote' AS location, 'yes' AS certifications FROM skill_course_database.courses;",
    "SELECT centre_id AS offering_id, subject_specialization AS title, tutor_name as tutor_name, platform_name AS platform_name, 'unknown' AS difficulty_level, 'paid' AS price, rating, NULL AS description, 'offline' AS Mode, NULL AS num_enrollments, 'db1' AS offering_type, location, 'no' AS certifications FROM (SELECT c.centre_id as centre_id, t.subject_specialization as subject_specialization, CONCAT(t.first_name, ' ', t.last_name) as tutor_name, c.name as platform_name, c.location as location, c.rating as rating FROM coaching_center c JOIN table_tutor t ON c.centre_id = t.centre_id) AS coaching_tutors;"


]