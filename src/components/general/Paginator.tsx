import styled from "@emotion/styled";
import * as React from "react";

const PaginatorContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center"
});

const PaginationElement = styled.span({
  margin: "20px 10px",
  color: "white"
});

const PaginatorPassiveElement = styled(PaginationElement)({
  color: "grey"
});

export interface PaginatorProperties {
  currentPage: number;
  next: boolean;
  previous: boolean;
  min?: number;
  max?: number;
  renderLink: (page: number, text?: string) => React.ReactElement;
}

export const Paginator: React.FC<PaginatorProperties> = React.memo((properties: PaginatorProperties) => {
  const { currentPage, renderLink, previous, next } = properties;
  const renderFirst = Number.isSafeInteger(properties.min);
  const min: number = renderFirst ? Number(properties.min) : Number.NEGATIVE_INFINITY;
  const renderLast = Number.isSafeInteger(properties.max);
  const max: number = renderLast ? Number(properties.max) : Number.POSITIVE_INFINITY;
  const renderPrevious = previous && min + 1 < currentPage;
  const renderNext = next && max - 1 > currentPage;

  return (
    <PaginatorContainer>
      {renderFirst && currentPage !== min && <PaginationElement>{renderLink(min)}</PaginationElement>}
      {renderFirst && currentPage > min + 1 && <PaginatorPassiveElement>...</PaginatorPassiveElement>}
      {renderPrevious && <PaginationElement>{renderLink(currentPage - 1, "<")}</PaginationElement>}
      <PaginatorPassiveElement>{currentPage}</PaginatorPassiveElement>
      {renderNext && <PaginationElement>{renderLink(currentPage + 1, ">")}</PaginationElement>}
      {renderLast && currentPage < max - 1 && <PaginatorPassiveElement>...</PaginatorPassiveElement>}
      {renderLast && currentPage !== max && <PaginationElement>{renderLink(max)}</PaginationElement>}
    </PaginatorContainer>
  );
});

Paginator.displayName = "Paginator";
