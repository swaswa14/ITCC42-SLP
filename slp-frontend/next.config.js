/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    retrieve_projects: "http://localhost:8080/api/v1/project/all",
    retrieve_mapped_projects: "http://localhost:8080/api/v1/project/mapped_projects",
    create_project: "http://localhost:8080/api/v1/project/create",
    delete_project: "http://localhost:8080/api/v1/project/delete/{id}",
    update_project: "http://localhost:8080/api/v1/project/update/{id}",

  }

}
