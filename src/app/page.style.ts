import styled from "@emotion/styled";

export const LogoContainer = styled.div`
    position: relative;
    display: inline-block;
`;

export const Accent = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    right: 20px;
    top: -13px;
`;

export const CharacterWithAccent = styled.span`
    position: relative;
    display: inline-block;
`;

export const Container = styled.div`
    background-color: #25C2FF;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContentWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    max-width: 36rem; /* xl = 36rem */
    padding-left: 3rem; /* px-12 = 3rem */
    padding-right: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const MainContent = styled.div`
    padding-top: min(9rem, 12vh);
    padding-bottom: 3rem;

    @media (min-width: 1024px) {
        padding-top: min(11rem, 15vh);
    }

    @media (max-height: 600px) {
        padding-top: 4rem;
    }
`;

export const Heading = styled.h2`
    font-size: 2.25rem; /* text-4xl = 2.25rem */
    font-weight: 600; /* font-semibold = 600 */
    line-height: 1.25; /* leading-tight = 1.25 */
`;

export const VerticalLine = styled.div`
    border-left: 1px solid white;
    height: min(9rem, 12vh);
    margin-top: min(2rem, 3vh);
    margin-left: 0.25rem;

    @media (min-width: 1024px) {
        height: min(11rem, 15vh);
    }

    @media (max-height: 600px) {
        height: 6rem;
        margin-top: 1rem;
    }

    @media (max-height: 500px) {
        height: 4rem;
        margin-top: 0.75rem;
    }
`;
export const LogoText = styled.h1`
    font-size: 3.75rem; /* text-6xl = 3.75rem */
    font-weight: 700; /* font-bold = 700 */
`;

export const Footer = styled.footer`
    width: 100%;
    padding-bottom: 8rem;

    @media (min-width: 768px) {
        padding-bottom: 3rem;
    }
`;

export const KakaoButton = styled.button`
    width: 100%;
    font-weight: 600; /* font-semibold = 600 */
    background-color: #FDE047; /* bg-yellow-300 = #FDE047 */
    color: black;
    padding-top: 1rem; /* py-4 = 1rem (top) */
    padding-bottom: 1rem; /* py-4 = 1rem (bottom) */
    border-radius: 0.75rem; /* rounded-xl = 0.75rem */
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: #FACC15; /* hover:bg-yellow-400 = #FACC15 */
    }
`;

export const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem; /* space-x-2 = 0.5rem */
`;

export const KakaoIcon = styled.img`
    width: 1.5rem; /* w-6 = 1.5rem */
    height: 1.5rem; /* h-6 = 1.5rem */
`;