import Modal from 'react-modal';

export default function GamePhoneViewQuitGameDialog({ quitGameDialogOpen, closeQuitGameDialog, quitGameClick }) {
    
    return (
        <Modal
        isOpen={quitGameDialogOpen}
        onRequestClose={closeQuitGameDialog}
        contentLabel="Dialógus Ablak"
      >
        <button onClick={quitGameClick}>Kilépés</button>
        <button onClick={closeQuitGameDialog}>Mégse</button>
      </Modal>
    )
}