import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, Star } from "lucide-react";
import { Course } from "../types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="text-sm text-gray-500 mb-4">
          <div className="mb-2">
            <strong>Platform Name:</strong>{" "}
            {course.platform_name || "Not specified"}
          </div>
          <div className="mb-2">
            <strong>Certifications:</strong>{" "}
            {course.certifications || "Not available"}
          </div>
          <div className="mb-2">
            <strong>Difficulty Level:</strong>{" "}
            {course.difficulty_level || "Not specified"}
          </div>
          <div className="mb-2">
            <strong>Location:</strong> {course.location || "Not specified"}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> {course.price || "Free"}
          </div>
          <div className="mb-2">
            <strong>Tutor:</strong> {course.tutor_name || "Not specified"}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.num_enrollments} students</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{course.rating || "N/A"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
