import { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// Corrección: Importación por defecto
import UsuarioController from '../controllers/UsuarioController'; 

// Corrección: Usar la instancia exportada por defecto (singleton)
const controller = UsuarioController; 

export default function UsuarioView() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [editar, setEditar] = useState(false);
    const [usuarioEditado, setUsuarioEditado] = useState(null);

    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            Alert.alert("Error de Carga", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                await controller.initialize();
                await cargarUsuarios();
            } catch (error) {
                Alert.alert("Error de Inicialización", "No se pudo conectar a la base de datos.");
            }
        };
        
        init();

        controller.addListener(cargarUsuarios);
        return () => controller.removeListener(cargarUsuarios);
    }, [cargarUsuarios]);

    const handleAgregar = async () => {
        if (nombre.trim() === '') {
            Alert.alert("Advertencia", "El nombre del usuario no puede estar vacío.");
            return;
        }
        
        if (guardando) return;
        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert("Usuario Creado", `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`);
            setNombre('');
        } catch (error) {
            Alert.alert("Error al Agregar", error.message);
        } finally {
            setGuardando(false);
        }
    };

    const prepararEdicion = (usuario) => {
        setEditar(true);
        setUsuarioEditado(usuario);
        setNombre(usuario.nombre);
    };

    const handleEditar = async () => {
        if (!usuarioEditado || nombre.trim() === '') return;

        try {
            setGuardando(true);
            await controller.actualizarUsuario(usuarioEditado.id, nombre);
            Alert.alert("Éxito", "Usuario actualizado");
            setNombre('');
            setEditar(false);
            setUsuarioEditado(null);
        } catch (err) {
            Alert.alert("Error al Editar", err.message);
        } finally {
             setGuardando(false);
        }
    };

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Usuario",
            "¿Seguro que quieres eliminarlo?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await controller.eliminarUsuario(id);
                        } catch (err) {
                            Alert.alert("Error", err.message);
                        }
                    }
                }
            ]
        )
    };

    const renderUsuario = ({ item, index }) => (
        <View style={styles.userItem}>
            <View style={styles.userNumber}>
                <Text style={styles.userNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nombre}</Text>
                <Text style={styles.userId}>ID: {item.id}</Text>

                <Text style={styles.userDate}>
                    {new Date(item.fechaCreacion).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </Text>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.editBtn} onPress={() => prepararEdicion(item)}>
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.deleteBtn} onPress={() => handleEliminar(item.id)}>
                        <Text style={styles.actionText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>INSERT & SELECT</Text>
                <Text style={{ color: "#666" }}>SQLite</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{editar ? "EDITAR" : "INSERT"}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                />

                {!editar ? (
                    <TouchableOpacity 
                        style={[styles.btn, guardando && {opacity: 0.7}]} // Estilo simple para indicar guardando
                        onPress={handleAgregar}
                        disabled={guardando}
                    >
                        <Text style={styles.btnText}>{guardando ? "Guardando..." : "Agregar Usuario"}</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <TouchableOpacity 
                            style={[styles.btn, { flex: 1 }, guardando && {opacity: 0.7}]} 
                            onPress={handleEditar}
                            disabled={guardando}
                        >
                            <Text style={styles.btnText}>Actualizar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.cancelBtn, { flex: 1, backgroundColor: "#6c757d" }]} // Estilo añadido para Cancelar
                            onPress={() => {
                                setEditar(false);
                                setUsuarioEditado(null);
                                setNombre('');
                            }}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Usuarios Registrados</Text>

                {loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderUsuario}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },

    header: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
    },

    section: {
        marginBottom: 30,
    },

    sectionTitle: {
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 12,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },

    btn: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },

    // Añadido para que el botón Cancelar funcione con el estilo que usaste
    cancelBtn: { 
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    }, 

    userItem: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },

    userNumber: {
        width: 35,
        height: 35,
        backgroundColor: "#007bff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    userNumberText: {
        color: "#fff",
        fontWeight: "bold",
    },

    userInfo: { flex: 1 },

    actionRow: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
    },

    editBtn: {
        backgroundColor: "#f0ad4e",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },

    deleteBtn: {
        backgroundColor: "#d9534f",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },

    actionText: {
        color: "#fff",
        fontWeight: "bold",
    }
});