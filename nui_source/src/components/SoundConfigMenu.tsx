import { memo, useMemo, useState } from "react";
import { listen, send, callback } from "../utils/nui";
import { useModalContext } from "../context/ModalContext";
import { useTranslation } from "../context/Translation";
import Modal from "./Modal";
import Slider from "./Slider";
import DebouncedTextInput from "./DebouncedTextInput";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SearchIcon from "@mui/icons-material/Search";

interface SoundEntry {
	name: string;
	volume: number;
}

const SoundRow = memo(({ name, initialVolume }: { name: string; initialVolume: number }) => {
	const [volume, setVolume] = useState(initialVolume);

	return (
		<Slider
			label={name}
			displayLabel={`${volume.toFixed(2)}x`}
			value={volume}
			onChange={setVolume}
			onChangeEnd={(val) => send("SetSoundVolume", { name, volume: val })}
			min={0}
			max={2}
			step={0.05}
		/>
	);
});

const SoundConfigMenu = () => {
	const T = useTranslation();
	const { openModal, closeModal } = useModalContext();
	const [sounds, setSounds] = useState<SoundEntry[]>([]);
	const [loadingSounds, setLoadingSounds] = useState(false);
	const [search, setSearch] = useState("");

	const filteredSounds = useMemo(() => {
		if (!search) return sounds;

		const lower = search.toLowerCase();
		return sounds.filter((s) => s.name.toLowerCase().includes(lower));
	}, [sounds, search]);

	listen("SetOpen", async (val: boolean) => {
		if (val) {
			setSearch("");
			setLoadingSounds(true);
			openModal("soundConfig");

			const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
			const sounds = callback("GetSoundsList");

			await delay(200);
			setSounds(await sounds as SoundEntry[]);
			setLoadingSounds(false);
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
			loading={loadingSounds}
			modalStyling={{
				width: "50rem",
			}}
		>
			<DebouncedTextInput
				value={search}
				onChange={setSearch}
				placeholder={T("searchSounds")}
				icon={<SearchIcon />}
				style={{ width: "100%", marginBottom: "0.5rem" }}
				delay={100}
			/>
			<div
				style={{
					maxHeight: "60vh",
					overflowY: "auto",
					overflowX: "hidden",
					paddingRight: "0.5rem",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "0.2rem",
						padding: "0 0 1.5rem 0",
					}}
				>
					{filteredSounds.length === 0 ? (
						<p
							style={{
								textAlign: "center",
								color: "rgba(var(--secText))",
								padding: "1.8rem 0 0 0",
								fontSize: "1.4rem",
							}}
						>
							{T("noSoundsFound")}
						</p>
					) : (
						filteredSounds.map((sound) => (
							<SoundRow
								key={sound.name}
								name={sound.name}
								initialVolume={sound.volume}
							/>
						))
					)}
				</div>
			</div>
		</Modal>
	);
};

export default SoundConfigMenu;
