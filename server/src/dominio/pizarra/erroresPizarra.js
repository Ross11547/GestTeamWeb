export class ErrorDominio extends Error {
    constructor(mensaje, codigo = "ERROR_DOMINIO", estadoHttp = 400, extras = null) {
        super(mensaje);
        this.codigo = codigo;
        this.estadoHttp = estadoHttp;
        this.extras = extras;
    }
}

export class ErrorValidacion extends ErrorDominio {
    constructor(mensaje = "Datos inválidos", extras = null) {
        super(mensaje, "VALIDACION", 400, extras);
    }
}

export class ErrorNoEncontrado extends ErrorDominio {
    constructor(mensaje = "No encontrado", extras = null) {
        super(mensaje, "NO_ENCONTRADO", 404, extras);
    }
}

export class ErrorConflicto extends ErrorDominio {
    constructor(mensaje = "Conflicto", extras = null) {
        super(mensaje, "CONFLICTO", 409, extras);
    }
}

export class ErrorNoAutorizado extends ErrorDominio {
    constructor(mensaje = "No autorizado", extras = null) {
        super(mensaje, "NO_AUTORIZADO", 403, extras);
    }
}
