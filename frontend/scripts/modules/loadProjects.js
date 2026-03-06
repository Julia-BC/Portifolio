import supabaseClient from "../core/supabaseClient.js"

export async function loadProjects(filter = {}) {

    const container = document.getElementById("projects-container")
    if (!container) return

    let query = supabaseClient
        .from("projects")
        .select("*")
        .order("order_display", { ascending: true })

    // FILTRO PARA HOME (apenas projetos principais)
    if (filter.featured) {
        query = query.eq("featured", true)
    }

    // FILTRO POR CATEGORIA
    if (filter.category) {
        query = query.eq("category", filter.category)
    }

    const { data, error } = await query

    if (error) {
        console.error("Erro ao buscar projetos:", error)
        return
    }

    container.innerHTML = ""

    data.forEach(project => {

        const card = document.createElement("div")
        card.classList.add("project-card")

        card.innerHTML = `
            <img src="${project.thumbnail_url}" alt="${project.title}">
                
            <div class="project-overlay">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                
                <div class="project-links">
                    ${project.demo_url ? `<a href="${project.demo_url}" target="_blank">Demo</a>` : ""}
                    ${project.github_url ? `<a href="${project.github_url}" target="_blank">GitHub</a>` : ""}
                </div>
            </div>
            `

    container.appendChild(card)
    })
}