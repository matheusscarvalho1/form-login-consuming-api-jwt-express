import { useNavigate } from "react-router"

const HomePage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/signin')
    }

    return (
        <>
            <h1>Sejam bem vindos a Homepage!</h1>
            <div className="flex gap-4">
                <button onClick={handleLogin}>Já possui cadastro ? Acesse agora!</button>
                <button onClick={handleRegister}>Ainda não possui cadastro ? Crie um agora mesmo!</button>
            </div>
        </>
    )
}

export default HomePage