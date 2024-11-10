import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Course = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.course.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.course.title}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.course.hours}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
    <img alt="Microcourses" className="h-16 inline" src={props.course.img}></img>
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
          to={`/edit/${props.course._id}`}
        >
          View
        </Link>
      </div>
    </td>
  </tr>
);

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  // This method fetches the courses from the database.
  useEffect(() => {
    async function getCourses() {
      const response = await fetch(`http://localhost:5050/courses/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const courses = await response.json();
      setCourses(courses);
    }
    getCourses();
    return;
  }, [courses.length]);

  

  // This method will map out the course on the table
  function courseList() {
    return courses.map((course) => {
      return (
        <Course
          course={course}
          key={course._id}
        />
      );
    });
  }

  // This following section will display the table with the courses.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Course List</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Course Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Hours to Complete
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Image 
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {courseList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}