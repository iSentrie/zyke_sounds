import { ModalProvider } from "../context/ModalContext";
import SoundConfigMenu from "./SoundConfigMenu";

function App() {
	return (
		<ModalProvider>
			<div style={{ width: "100vw", height: "100vh" }}>
				<SoundConfigMenu />
			</div>
		</ModalProvider>
	);
}

export default App;
