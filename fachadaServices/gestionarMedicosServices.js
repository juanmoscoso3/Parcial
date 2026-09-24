class GestionarMedicos {
    constructor(repoMedico) {
        this.repoMedico = repoMedico;
    }

    registrarMedico(nombres, apellidos, especialidad, diasAtencion, horarioInicio, horarioFin, añosExperiencia, bibliografia) {
        const id = this.repoMedico.siguienteId();
        const medico = new Medico(id, nombres, apellidos, especialidad, diasAtencion, horarioInicio, horarioFin, añosExperiencia, bibliografia);
        this.repoMedico.agregar(medico);
        return medico;
    }

    listarMedicos() {
        return this.repoMedico.obtenerTodos();
    }

    buscarMedico(id) {
        return this.repoMedico.buscarPorId(id);
    }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);