import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Course() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    hours: "",
    desc: "",
    img: "",
    modules: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/courses/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const course = await response.json();
      if (!course) {
        console.warn(`course with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(course);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new courses we will POST to /courses.
        response = await fetch("http://localhost:5050/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a course we will PATCH to /courses/:id.
        response = await fetch(`http://localhost:5050/courses/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", position: "", level: "", desc: "", img: "" });
      navigate("/");
    }
  }


  // This following section will display the course info.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">View Course</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Course Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
            <img alt="Microcourses" className="h-17" src={form.img}></img>
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Course Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  {form.name}
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  
                  {form.title}
                </div>
              </div>
              </div>
              <div className="sm:col-span-4">
              <label
                htmlFor="level"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Hours to Complete
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {form.hours}
                </div>
              </div>
              </div>
              <div className="sm:col-span-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Detailed Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {form.desc}
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
               Modules
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                
                {form.modules}
                
                </div>
              </div>
            </div>
         
          </div>
        </div>
        <input
          type="submit"
          value="Enrol"
          className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
        />
      </form>
    </>
  );
}