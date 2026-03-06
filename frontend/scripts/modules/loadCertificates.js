import supabaseClient from "../core/supabaseClient.js"

export async function loadCertificates() {
    const container = document.getElementById("certificates-container")
    if (!container) return

    const { data, error } = await supabaseClient
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: true })

    if (error) {
        console.error("Erro ao buscar certificados:", error)
        return
    }

    container.innerHTML = ""

    data.forEach(certificate => {
        if (!certificate.thumbnail_url) return

        const card = document.createElement("div")
        card.classList.add("certificate-card")

        card.innerHTML = `
            <img src="${certificate.thumbnail_url}" alt="${certificate.name}">
            <h3>${certificate.title}</h3>
            <p>${certificate.institution}</p>
            <span>${(certificate.year_obtained)}</span>
        `

        card.addEventListener("click", () => {
            window.open(certificate.certificate_url, "_blank")
        })

        container.appendChild(card)
    })
}