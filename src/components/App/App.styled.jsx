import styled from '@emotion/styled';

export const AppSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
  margin-top: 0;
`;

export const InfoDiv = styled.div`
  position: fixed;
  top: 40%;
  text-align: center;
  margin: 50px auto;
  font-size: 50px;
  font-weight: 800;
  color: lightgrey;
  filter: drop-shadow(2px 4px 6px black);
`;

export const InfoH1 = styled.h1`
  color: black;
  margin-top: 0;
`;
