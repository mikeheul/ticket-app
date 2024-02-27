"use client"; // explicit use of client javascript

import { useRouter } from "next/navigation"
import React, {useState} from "react"

const TicketForm = () => {

    const router = useRouter()

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        //console.log("submitted");
        e.preventDefault();
        const res = await fetch("/api/Tickets", {
            method: "POST",
            body: JSON.stringify({formData}),
            "content-type": "application/json"
        });

        if(!res.ok) {
            throw new Error("Failed to create Ticket.");
        }

        router.refresh();
        router.push("/");
    }

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hadware Problem"
    };

    const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
        <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit} >
            <h3>Create Your Ticket</h3>
            <label htmlFor="">Title</label>
            <input 
                id="title" 
                name="title" 
                type="text" 
                onChange={handleChange} 
                required={true} 
                value={formData.title} 
            />
            <label htmlFor="">Description</label>
            <textarea 
                id="description" 
                name="description" 
                onChange={handleChange} 
                required={true} 
                value={formData.description} 
                rows="5"
            />

            <label htmlFor="">Category</label>
            <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange} 
                >
                <option value="Hardware Problem">Hardware Problem</option>
                <option value="Software Problem">Software Problem</option>
                <option value="Project">Project</option>
            </select>

            <label htmlFor="">Priority</label>
            <div>
                <input 
                    id="priority-1"
                    name="priority"
                    type="radio" 
                    onChange={handleChange}
                    value={1}
                    checked={formData.priority == 1} 
                />
                <label htmlFor="">1</label>
                <input 
                    id="priority-2"
                    name="priority"
                    type="radio" 
                    onChange={handleChange}
                    value={2}
                    checked={formData.priority == 2} 
                />
                <label htmlFor="">2</label>
                <input 
                    id="priority-3"
                    name="priority"
                    type="radio" 
                    onChange={handleChange}
                    value={3}
                    checked={formData.priority == 3} 
                />
                <label htmlFor="">3</label>
                <input 
                    id="priority-4"
                    name="priority"
                    type="radio" 
                    onChange={handleChange}
                    value={4}
                    checked={formData.priority == 4} 
                />
                <label htmlFor="">4</label>
                <input 
                    id="priority-5"
                    name="priority"
                    type="radio" 
                    onChange={handleChange}
                    value={5}
                    checked={formData.priority == 5} 
                />
                <label htmlFor="">5</label>
            </div>

            <label htmlFor="">Progress</label>
            <input 
                type="range" 
                name="progress" 
                id="progress" 
                value={formData.progress}
                min="0"
                max="100"
                onChange={handleChange}
            />

            <label htmlFor="">Status</label>
            <select 
                name="status" 
                id="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="not started">Not Started</option>
                <option value="started">Started</option>
                <option value="done">Done</option>
            </select>

            <input 
                className="btn"
                value="Create Ticket"
                type="submit" 
            />
        </form>
    </div>
  )
}

export default TicketForm