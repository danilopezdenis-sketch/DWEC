function crearFecha(input) {
    if (!input) return null;

    if (typeof input === 'number') {
        return new Date(input);
    }

    if (typeof input === 'string') {
        let fecha = new Date(input);
        if (!isNaN(fecha)) return fecha;
    }

    if (typeof input === 'object' && input.year) {
        const month = (input.month ?? 1) - 1;
        return new Date(
            input.year,
            month,
            input.day ?? 1,
            input.hour ?? 0,
            input.minute ?? 0,
            input.second ?? 0
        );
    }

    return null; 
}

function posponerEvento(fecha, dias) {
    const nueva = new Date(fecha);
    nueva.setDate(nueva.getDate() + dias); 
    return nueva;
}

const eventosData = [
    {"nombre": "Evento A", "fecha": "2026-02-28T15:00:00"},
    {"nombre": "Evento B", "fecha": 1719878400000},
    {"nombre": "Evento C", "fecha": {"year": 2026, "month": 3, "day": 15, "hour": 12}}
];

const eventos = eventosData.map(ev => ({
    nombre: ev.nombre,
    fecha: crearFecha(ev.fecha)
}));

eventos.sort((a, b) => a.fecha - b.fecha);

const container = document.getElementById('eventos-container');

eventos.forEach((ev, index) => {
    const div = document.createElement('div');
    div.classList.add('evento');
    div.innerHTML = `
        <strong>${ev.nombre}</strong> - 
        Fecha: ${ev.fecha.toLocaleString()} 
        <br>
        <span class="contador" id="contador-${index}"></span>
        <br>
        <button onclick="posponer(${index}, 1)">Posponer 1 día</button>
        <button onclick="posponer(${index}, 7)">Posponer 7 días</button>
    `;
    container.appendChild(div);
});

function posponer(index, dias) {
    eventos[index].fecha = posponerEvento(eventos[index].fecha, dias);
    eventos.sort((a, b) => a.fecha - b.fecha);
    actualizarContadores();
}

function actualizarContadores() {
    const now = Date.now();

    eventos.forEach((ev, index) => {
        const diff = ev.fecha - now; // ms
        const span = document.getElementById(`contador-${index}`);

        if (diff <= 0) {
            span.textContent = '¡Evento en curso o finalizado!';
            return;
        }

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diff / (1000 * 60)) % 60);
        const segundos = Math.floor((diff / 1000) % 60);

        span.textContent = `${dias}D : ${horas}H : ${minutos}M : ${segundos}S`;
    });
}

setInterval(actualizarContadores, 1000);
actualizarContadores();

