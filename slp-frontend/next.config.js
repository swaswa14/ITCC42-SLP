/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    retrieve_projects: "http://ec2-54-253-215-31.ap-southeast-2.compute.amazonaws.com:8081/api/v1/project/all",
    retrieve_mapped_projects: "http://ec2-54-253-215-31.ap-southeast-2.compute.amazonaws.com:8081/api/v1/project/mapped_projects",
    create_project: "http://ec2-54-253-215-31.ap-southeast-2.compute.amazonaws.com:8081/api/v1/project/create",
    delete_project: "http://ec2-54-253-215-31.ap-southeast-2.compute.amazonaws.com:8081/api/v1/project/delete/{id}",
    update_project: "http://ec2-54-253-215-31.ap-southeast-2.compute.amazonaws.com:8081/api/v1/project/update/{id}",

  }

}
