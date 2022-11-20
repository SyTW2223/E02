import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';

export default function Breadcrumb() {
  return (
    <>
      <MDBBreadcrumb className='text-light bg-dark'>
        <MDBBreadcrumbItem>
        <a href='#'>Home</a>
        </MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </>
  );
}