import * as React from "react";
import styled from "@emotion/styled";

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

export interface PaginatorProps {
  currentPage: number;
  next: boolean;
  previous: boolean;
  min?: number;
  max?: number;
  renderLink: (page: number, text?: string) => React.ReactElement;
}

export const Paginator: React.FC<PaginatorProps> = React.memo((props: PaginatorProps) => {
  const { currentPage, renderLink, previous, next } = props;
  const renderFirst = Number.isSafeInteger(props.min);
  const min: number = renderFirst ? Number(props.min) : Number.NEGATIVE_INFINITY;
  const renderLast = Number.isSafeInteger(props.max);
  const max: number = renderLast ? Number(props.max) : Number.POSITIVE_INFINITY;
  const renderPrev = previous && min + 1 < currentPage;
  const renderNext = next && max - 1 > currentPage;

  return (
    <PaginatorContainer>
      {renderFirst && currentPage !== min && <PaginationElement>{renderLink(min)}</PaginationElement>}
      {renderFirst && currentPage > min + 1 && <PaginatorPassiveElement>...</PaginatorPassiveElement>}
      {renderPrev && <PaginationElement>{renderLink(currentPage - 1, "<")}</PaginationElement>}
      <PaginatorPassiveElement>{currentPage}</PaginatorPassiveElement>
      {renderNext && <PaginationElement>{renderLink(currentPage + 1, ">")}</PaginationElement>}
      {renderLast && currentPage < max - 1 && <PaginatorPassiveElement>...</PaginatorPassiveElement>}
      {renderLast && currentPage !== max && <PaginationElement>{renderLink(max)}</PaginationElement>}
    </PaginatorContainer>
  );
});

Paginator.displayName = "Paginator";
