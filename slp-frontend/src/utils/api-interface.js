import axios from "axios";


export const retrieveProjects = async () => {
    try {
        const res = await  axios.get(process.env.retrieve_projects, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const retrieveMappedData = async () => {
    try {
        const res = await  axios.get(process.env.retrieve_mapped_projects, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const createProject = async (data) => {
    try {
        const res = axios.post(process.env.create_project,
            data,
            {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const deleteProject = async (id) => {
    try {
        const res = axios.delete(process.env.delete_project.replace("{id}", id),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            });

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateProject = async (id, data) => {
    try {
        const res = axios.put(process.env.update_project.replace("{id}", id),
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
            });

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};