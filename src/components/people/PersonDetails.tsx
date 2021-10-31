import * as React from "react";
import styled from "@emotion/styled";
import { Person } from "../../models/entities";

export interface PersonDetailsProps {
  person: Person
}

const Container = styled.div({
  display: "flex"
})

export const PersonDetails: React.FC<PersonDetailsProps> = (props: PersonDetailsProps) => {
  return <Container>{props.person.name}</Container>;
};

PersonDetails.displayName = "PersonDetails";
