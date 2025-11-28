import { Usuario } from '../models/usuario';
import DatabaseService from '../database/DatabaseService';

class UsuarioController {
    constructor() {
        this.listeners = [];
    }

    async initialize() {
        await DatabaseService.initialize();
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb());
    }

    async obtenerUsuarios() {
        const data = await DatabaseService.getAll();
        return data.map(u => new Usuario(u.id, u.nombre, u.fecha_creacion));
    }

    async crearUsuario(nombre) {
        Usuario.validar(nombre);
        const nuevo = await DatabaseService.add(nombre.trim());
        this.notifyListeners();
        return new Usuario(nuevo.id, nuevo.nombre, nuevo.fecha_creacion);
    }

    async actualizarUsuario(id, nombre) {
        Usuario.validar(nombre);
        await DatabaseService.actualizar(id, nombre.trim());
        this.notifyListeners();
    }

    async eliminarUsuario(id) {
        await DatabaseService.eliminar(id);
        this.notifyListeners();
    }
}

export default new UsuarioController();