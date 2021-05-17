import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import VerifyToken from "../components/VerifyToken";

const GridStyles = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding-top: 2rem;
`;

export default function SingInPage() {
    return (
        <div>
            <GridStyles>
                <SignIn />
                <SignUp />
            </GridStyles>
            <GridStyles>
                <VerifyToken />
            </GridStyles>
        </div>
        
    )
}
