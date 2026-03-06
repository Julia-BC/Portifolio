import { loadSkills } from "./modules/loadSkills.js"
import { loadCertificates } from "./modules/loadCertificates.js"
import { loadProjects } from "./modules/loadProjects.js"

if (window.location.pathname.includes("/projects")){
    loadProjects()

} else {
    loadProjects({ featured: true })
}

document.addEventListener("DOMContentLoaded", () => {
    loadSkills()
    loadCertificates()
    loadProjects({ category: "fullstack" })
})