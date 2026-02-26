import { ModalProvider } from "../context/ModalContext";
import { TranslationProvider } from "../context/Translation";
import SoundConfigMenu from "./SoundConfigMenu";

function App() {
	return (
		<TranslationProvider>
			<ModalProvider>
				<div style={{ width: "100vw", height: "100vh" }}>
					<SoundConfigMenu />
				</div>
			</ModalProvider>
		</TranslationProvider>
	);
}

export default App;
