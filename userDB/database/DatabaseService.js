import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
    constructor() {
        this.db = null;
        this.storageKey = 'usuarios';
    }

    async initialize() {
        if (Platform.OS === 'web') return;

        this.db = await SQLite.openDatabaseAsync('miapp.db');

        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
    }

    async getAll() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        }

        return await this.db.getAllAsync(`
            SELECT id, nombre, fecha_creacion
            FROM usuarios
            ORDER BY id DESC
        `);
    }

    async add(nombre) {
        if (Platform.OS === 'web') {
            const lista = await this.getAll();

            const nuevo = {
                id: Date.now(),
                nombre,
                fecha_creacion: new Date().toISOString()
            };

            lista.unshift(nuevo);
            localStorage.setItem(this.storageKey, JSON.stringify(lista));
            return nuevo;
        }

        const result = await this.db.runAsync(
            "INSERT INTO usuarios (nombre) VALUES (?);",
            [nombre]
        );

        return {
            id: result.lastInsertRowId,
            nombre,
            fecha_creacion: new Date().toISOString()
        };
    }

    async actualizar(id, nombreNuevo) {
        if (Platform.OS === 'web') {
            const lista = await this.getAll();
            const idToCompare = typeof id === 'string' ? parseInt(id) : id;
            const idx = lista.findIndex(u => u.id === idToCompare);

            if (idx !== -1) lista[idx].nombre = nombreNuevo;

            localStorage.setItem(this.storageKey, JSON.stringify(lista));
            return true;
        }

        await this.db.runAsync(
            "UPDATE usuarios SET nombre = ? WHERE id = ?;",
            [nombreNuevo, id]
        );

        return true;
    }

    async eliminar(id) {
        if (Platform.OS === 'web') {
            let lista = await this.getAll();
            const idToCompare = typeof id === 'string' ? parseInt(id) : id;
            lista = lista.filter(u => u.id !== idToCompare);
            localStorage.setItem(this.storageKey, JSON.stringify(lista));
            return true;
        }

        await this.db.runAsync(
            "DELETE FROM usuarios WHERE id = ?;",
            [id]
        );

        return true;
    }
}

export default new DatabaseService();