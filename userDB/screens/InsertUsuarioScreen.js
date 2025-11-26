import { useEffect, useState, useCallback } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, 
    FlatList, StyleSheet, Alert, ActivityIndicator 
} from 'react-native';
import { UsuarioController } from '../controllers/UsuarioController';

const controller = new UsuarioController();

export default function UsuarioView() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);

    const cargarUsuarios = useCallback(async () => {
        try {
            setLoading(true);
            const data = await controller.obtenerUsuarios();
            setUsuarios(data);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await controller.initialize();
            await cargarUsuarios();
        };
        init();

        controller.addListener(cargarUsuarios);
        return () => controller.removeListener(cargarUsuarios);
    }, [cargarUsuarios]);

    const handleAgregar = async () => {
        if (guardando) return;
        try {
            setGuardando(true);
            const usuarioCreado = await controller.crearUsuario(nombre);
            Alert.alert(
                "Usuario Creado",
                `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`
            );
            setNombre('');
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setGuardando(false);
        }
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
            </View>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>INSERT & SELECT</Text>
                <Text style={{ color: "#666" }}>SQLite </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>INSERT</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribe el nombre del usuario"
                    value={nombre}
                    onChangeText={setNombre}
                />

                <TouchableOpacity 
                    style={styles.btn}
                    onPress={handleAgregar}
                >
                    <Text style={styles.btnText}>
                        {guardando ? "Guardando..." : "Agregar Usuario"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>SELECT</Text>

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
        fontSize: 16,
        fontWeight: "bold",
    },

    userItem: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },

    userNumber: {
        width: 35,
        height: 35,
        backgroundColor: "#007bff",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },

    userNumberText: {
        color: "#fff",
        fontWeight: "bold",
    },

    userInfo: {
        flex: 1,
    },

    userName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    userId: {
        color: "#333",
        marginTop: 2,
    },

    userDate: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },

});
