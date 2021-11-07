import React from "react";
import { rgba } from "emotion-rgba";
import styled from "@emotion/styled";

export interface EntityDetail {
  label: string;
  value: string;
}

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingLeft: 30,
  width: "100%"
});

const EntityName = styled.h4({
  display: "flex",
  fontSize: "1.1rem",
  textAlign: "start",
  fontFamily: "'Open Sans', sans-serif",
  margin: "2",
  color: rgba("#f1e9e9", 0.459),
  textTransform: "uppercase"
});

const List = styled.ul({
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  listStyle: "none",
  width: "100%"
});

const ListItem = styled.li({
  display: "flex",
  flexDirection: "row",
  fontSize: "0.9rem",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
  margin: "10 auto",
  color: rgba("#f1e9e9", 0.459),
  width: "100%"
});

const InfoBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  alignContent: "flex-start"
});

const LabelInfoBlock = styled(InfoBlock)({
  width: 120
});

const ValueInfoBlock = styled(InfoBlock)({
  width: "100%"
});

const DateInfoBlock = styled(ValueInfoBlock)({
  fontSize: "0.8rem"
});

export interface DetailsListProps {
  caption?: string;
  details: EntityDetail[];
  lastEdited?: Date;
}

export const DetailsList: React.FC<DetailsListProps> = (props: DetailsListProps) => {
  return (
    <Container>
      {props.caption && <EntityName>{props.caption}</EntityName>}
      <List>
        {props.details.map((d) => (
          <ListItem key={d.label}>
            <LabelInfoBlock>{d.label}</LabelInfoBlock>
            <ValueInfoBlock>{d.value}</ValueInfoBlock>
          </ListItem>
        ))}
        {props.lastEdited && (
          <ListItem key={"lastEdited"}>
            <DateInfoBlock>Last Edited</DateInfoBlock>
            <DateInfoBlock>{props.lastEdited.toISOString()}</DateInfoBlock>
          </ListItem>
        )}
      </List>
    </Container>
  );
};
