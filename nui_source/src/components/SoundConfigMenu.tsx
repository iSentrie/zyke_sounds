import { listen, send } from "../utils/nui";
import { useModalContext } from "../context/ModalContext";
import { useTranslation } from "../context/Translation";
import Modal from "./Modal";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const SoundConfigMenu = () => {
	const T = useTranslation();
	const { openModal, closeModal } = useModalContext();

	listen("SetOpen", (val: boolean) => {
		if (val) {
			openModal("soundConfig");
		} else {
			closeModal("soundConfig");
		}
	});

	return (
		<Modal
			id="soundConfig"
			icon={<VolumeUpIcon />}
			title={T("soundConfigTitle")}
			onClose={() => send("CloseMenu")}
			closeButton
			modalStyling={{
				width: "50rem",
			}}
		>
			<div>
				<p style={{ color: "rgba(var(--secText))", fontSize: "1.3rem" }}>
					TODO
				</p>
			</div>
		</Modal>
	);
};

export default SoundConfigMenu;
