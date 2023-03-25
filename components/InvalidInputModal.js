// non implementato
import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

export default function InvalidInputModal(proppen) {

  const [visible, setVisible] = useState(false);

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button auto shadow onPress={handler}>
        Open modal
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
        <Text>Invalid Input</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
