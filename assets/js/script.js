document.addEventListener('DOMContentLoaded', function () {
    const sections = [
        { id: 'section-1', start: 1, end: 5 },
        { id: 'section-2', start: 6, end: 10 },
        { id: 'section-3', start: 11, end: 15 },
    ];

    sections.forEach(section => {
        let currentCharacter = section.start;

        const element = document.getElementById(section.id);

        element.style.display = 'flex';
        element.style.flexWrap = 'wrap'; // Permite que los elementos se envuelvan a una nueva fila

        element.addEventListener('mouseenter', async function () {
            console.log(`Mouse entered section ${section.id}`); // Depuración

            if (currentCharacter <= section.end) {
                try {
                    const response = await fetch(`https://swapi.dev/api/people/${currentCharacter}/`);
                    const character = await response.json();

                    console.log(`Fetched character ${character.name}`); // Depuración

                    // Verificamos si los datos son válidos
                    if (character && character.name) {
                        const col = document.createElement('div');
                        col.className = 'col-12 col-md-6 col-lg-4'; // Ocupará 50% en pantallas medianas y grandes
                        col.innerHTML = `
                            <div class="single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                                <div class="timeline-icon"><i class="fa fa-user" aria-hidden="true"></i></div>
                                <div class="timeline-text">
                                    <h6>${character.name}</h6>
                                    <p>Height: ${character.height} cm</p>
                                    <p>Weight: ${character.mass} kg</p>
                                </div>
                            </div>
                        `;

                        element.appendChild(col);
                        currentCharacter++;
                    } else {
                        console.error("Character data is invalid or missing"); // Depuración
                        this.removeEventListener('mouseenter', arguments.callee);
                    }
                } catch (error) {
                    console.error("Error fetching character:", error); // Depuración
                }
            }

            if (currentCharacter > section.end) {
                this.removeEventListener('mouseenter', arguments.callee); // Detener cuando se haya alcanzado el último personaje
            }
        });
    });
});