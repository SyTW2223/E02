import {
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";

import Card from "./Card";
import config from "../../config";

/**
 * Muestra las tarjetas de los panes
 * @returns CardDisplay
 */
export default function CardDisplay() {
  return (
    <MDBContainer fluid className="p-4">
      <MDBRow className="row-cols-2 g-4">
        {config.cards.map(({ title, image }) => (
            <Card title={title} image={image} />
        ))}
      </MDBRow>
    </MDBContainer>
  );
}