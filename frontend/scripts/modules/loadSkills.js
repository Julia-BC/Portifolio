import supabaseClient from "../core/supabaseClient.js"

export async function loadSkills() {
  const container = document.getElementById("skills-container")

  if (!container) return

  const { data, error } = await supabaseClient
    .from("skills")
    .select("*")
    .eq("active", true)
    .order("order_display", { ascending: true })


  if (error) {
    console.error("Erro ao buscar tecnologias:", error)
    return
  }

  container.innerHTML = ""

  data.forEach(skill => {
    if (!skill.icon) return

    const card = `
      <div class="skill-card">
        <img src="${skill.icon}" alt="${skill.name}">
      </div>
    `
    container.innerHTML += card
  })
}