import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';

export default function Breadcrumb() {
  return (
    <>
      <MDBBreadcrumb className='text-light'>
        <MDBBreadcrumbItem>
        <a className='text-dark' href='#'>Home</a>
        </MDBBreadcrumbItem>
      </MDBBreadcrumb>
    </>
  );
}