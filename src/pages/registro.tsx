import { Tooltip, Avatar, Card, TextInput, Button, Image, PasswordInput, Text } from '@mantine/core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signup } from "../services/usuarios";
import { notifications } from "@mantine/notifications";
function Registro() {
    const [image_select, set_image_select] = useState(0)
    const [bandera, set_bandera] = useState(0)
    const changeImage = (idImagen: number) => {
        set_image_select(idImagen)
    }
    const changeBandera = (bandera: number) => {
        set_bandera(bandera)
    }
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const usuario = formData.get("user") as string;
        const password = formData.get("password") as string;
        const password2 = formData.get("password2") as string;
        const foto_perfil = image_select
        if (!usuario || !password || !password2 || !foto_perfil){
            notifications.show({
                title: "Error",
                color: "red",
                message: 'Ingresar todos los datos solicitados',
            });
        }
        
        if (password == password2){
            changeBandera(0)
            if (!usuario || !password || !password2 || !foto_perfil) return;
            // llama al servicio
            try {
                const data = await signup({ usuario, password, foto_perfil });
                // si no hay error, redirige a la página de inicio
                navigate("/chats");
            } catch (error: any) {
                notifications.show({
                    title: "Error",
                    color: "red",
                    message: 'datos incorrectos',
                });
            }
        }
        else    
            changeBandera(1)
    return;
};
return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card shadow="sm" padding="lg" radius="md" style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex_start",
            padding: 31,
            gap: 53,
            position: "absolute",
            width: "50%",
            height: "90%",
            top: "5%",
            background: "#ffffff",
            boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)",
            borderRadius: 4,
            margin: "0 auto"
        }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{
                        position: "absolute",
                        width: "20%",
                        height: "10%",
                        top: "5%"
                    }}
                    src="src/assets/images/Icon_MiauChat.svg"
                />
            </div>
            <div style={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30%",
                height: "15%",
                left: "35%",
                top: "25%",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: 25,
                lineHeight: 155,
                color: "black"
            }}>
                <Text
                    sx={(theme) => ({
                        fontFamily: `Open Sans, ${theme.fontFamily}`,
                        fontWeight: 600,
                        fontSize: "25px",
                        paddingTop: "30px",
                        paddingBottom: "50px",
                    })}
                    ta="center"
                    fz="xl"
                    fw={500}
                >Miau-Registro
                </Text>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <TextInput fz="xs" radius="sm" label="Nombre de usuario" placeholder="" name='user'
                        style={{
                            position: "absolute",
                            flexDirection: "column",
                            height: "5%",
                            width: "70%",
                            left: "15%",
                            top: "35%"
                        }} />

                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <div style={{
                        height: "5%",
                        width: "70%",
                        left: "15%",
                        top: "45%",
                        position: "absolute"
                    }}>
                        <Text
                            ta="left"
                            fz="sm"
                            fw={500}
                        >Elija una foto
                        </Text>
                        <Tooltip.Group openDelay={300} closeDelay={100}>
                            <Avatar.Group spacing="30">
                                <Tooltip label="Gato en caja" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_caja.png" radius="xl" size={image_select == 1 ? "15%" : "md"} onClick={e => { changeImage(1) }} />
                                </Tooltip>
                                <Tooltip label="Gato con Flores" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_flor.png" radius="xl" size={image_select == 2 ? "15%" : "md"} onClick={e => { changeImage(2) }} />
                                </Tooltip>
                                <Tooltip label="Gato con gorro" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_gorro.png" radius="xl" size={image_select == 3 ? "15%" : "md"} onClick={e => { changeImage(3) }} />
                                </Tooltip>
                                <Tooltip label="Gato en maceta" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_maceta.png" radius="xl" size={image_select == 4 ? "15%" : "md"} onClick={e => { changeImage(4) }} />
                                </Tooltip>
                                <Tooltip label="Gato mause" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_mause.png" radius="xl" size={image_select == 5 ? "15%" : "md"} onClick={e => { changeImage(5) }} />
                                </Tooltip>
                                <Tooltip label="Gato pez" withArrow>
                                    <Avatar src="/src/assets/images/Users_profile/Gato_pez.png" radius="xl" size={image_select == 6 ? "15%" : "md"} onClick={e => { changeImage(6) }} />
                                </Tooltip>
                            </Avatar.Group>
                        </Tooltip.Group>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <PasswordInput
                        placeholder=""
                        label="Contraseña"
                        name='password'
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "absolute",
                            height: "5%",
                            width: "70%",
                            left: "15%",
                            top: "60%"
                        }}
                    />
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <PasswordInput
                        error={bandera == 1 ? "Contraseñas diferentes" : ""}
                        placeholder=""
                        label="Confirmar contraseña"
                        name='password2'
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            position: "absolute",
                            height: "5%",
                            width: "70%",
                            left: "15%",
                            top: "70%"
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <Button style={{
                        position: "absolute",
                        height: "5%",
                        width: "70%",
                        left: "15%",
                        top: "85%"
                    }}
                        variant="gradient"
                        type="submit"
                        gradient={{ from: "cyan", to: "#26D6F1", deg: 35 }}
                        size="md"
                    >Registrarse</Button>
                </div>
            </form>
        </Card>
    </div>
)
}

export default Registro