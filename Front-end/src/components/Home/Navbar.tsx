import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { GiBread } from "react-icons/gi";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import styles from "../../css/Navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.userData);

  const [showBasic, setShowBasic] = useState(false);
  const { nombre } = useParams();
  const [ruta, setRuta] = useState("/login");
  const [nombreRuta, setNombreRuta] = useState("Autentificación");
  const [button, setButton] = useState("");

  useEffect(() => {
    if (user.token) {
      setRuta("/profile");
      setButton("Logout");
      setNombreRuta("Perfil");
    }
  }, [user]);

  const [searchTerm, setSearchTerm] = useState("");
  // Maneja el cambio de texto en el input
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  async function request(searchTerm: string) {
    localStorage.setItem("search", searchTerm);
    // Limpia el campo de búsqueda
    setSearchTerm("");
    window.location.href = "/tienda";
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(`You are searching for ${searchTerm}`);
    request(searchTerm);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const resetSearch = () => {
    localStorage.setItem("search", "");
    window.location.reload();
  };

  return (
    <MDBNavbar className={styles.navbar} expand="lg" light bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src="/logo.svg" height="45" alt="logo image" />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink
                className="text-light"
                active
                aria-current="page"
                href="/"
              >
                Inicio <AiFillHome />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink className={styles.navbarcolor} href="/tienda">
                Tienda Online <GiBread />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink
                href={ruta}
                className="text-light"
                tabIndex={-1}
                aria-disabled="true"
              >
                {nombreRuta} <MdAccountCircle />
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink
                href="/carrito"
                className="text-light"
                tabIndex={-1}
                aria-disabled="true"
              >
                Carrito <FaShoppingCart />
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <div className="d-flex">
            <div
              className="d-flex"
              style={{ backgroundColor: "#332D2D", borderRadius: "7px" }}
            >
              <div className="mx-2 ml-auto align-self-center">
                <form
                  className="d-flex input-group w-auto"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Buscar"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <MDBBtn className={styles.button}>Buscar</MDBBtn>
                </form>
              </div>
              <div className="mx-2 ml-auto align-self-center">
                <MDBBtn
                  color="tertiary"
                  onClick={resetSearch}
                  tabIndex={-1}
                  aria-disabled="true"
                  name="Limpiar"
                >
                  <MDBIcon icon="undo" size="2x" color="white" />
                </MDBBtn>
              </div>
            </div>
            {button === "Logout" ? (
              <div className="mx-2 ml-auto align-self-center">
                <MDBBtn
                  color="dark"
                  className="text-light"
                  onClick={handleLogout}
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  Salir
                </MDBBtn>
              </div>
            ) : (
              ""
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
