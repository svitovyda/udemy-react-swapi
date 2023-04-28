import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import React from "react";

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
  fontFamily: "'Open Sans', sans-serif",
  margin: "10 auto",
  color: rgba("#f1e9e9", 0.459),
  width: "100%"
});

const InfoBlock = styled.span({
  display: "flex",
  paddingLeft: 10,
  alignContent: "flex-start",
  alignItems: "flex-start"
});

const LabelInfoBlock = styled(InfoBlock)({
  width: 120
});

const ValueInfoBlock = styled(InfoBlock)({
  width: "100%",
  alignContent: "flex-start",
  alignItems: "flex-start",
  textAlign: "left"
});

const DateInfoBlock = styled(ValueInfoBlock)({
  fontSize: "0.7rem"
});

const DateLabelBlock = styled(LabelInfoBlock)({
  fontSize: "0.8rem"
});

const Image = styled.img({
  width: 250,
  height: 250,
  margin: "1rem",
  borderRadius: 10,
  objectFit: "cover"
});

export interface EntityDetailsViewProperties {
  caption?: string;
  details: EntityDetail[];
  lastEdited?: Date;
  img?: string;
}

export const EntityDetailsView: React.FC<EntityDetailsViewProperties> = (properties: EntityDetailsViewProperties) => {
  return (
    <Container>
      {properties.caption && <EntityName>{properties.caption}</EntityName>}
      {properties.img && <Image src={properties.img} alt={properties.caption} />}
      <List>
        {properties.details.map((d) => (
          <ListItem key={d.label}>
            <LabelInfoBlock>{d.label}</LabelInfoBlock>
            <ValueInfoBlock>{d.value}</ValueInfoBlock>
          </ListItem>
        ))}
        {properties.lastEdited && (
          <ListItem key={"lastEdited"}>
            <DateLabelBlock>Last Edited</DateLabelBlock>
            <DateInfoBlock>{properties.lastEdited.toISOString()}</DateInfoBlock>
          </ListItem>
        )}
      </List>
    </Container>
  );
};

EntityDetailsView.displayName = "EntityDetailsView";
