import React from "react";
import classNames from "classnames";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Section from "./Section";
import styles from "./SponsorSection.module.scss";

/* Sponsor Group */
/* Use this for section styling */
const SponsorGroup = ({ children }) => <div className="mb-5">{children}</div>;

SponsorGroup.Title = ({ children }) => (
  <Row>
    <Col className="text-center pb-3">
      <h4 style={{ fontFamily: "Roboto Mono" }}>{children}</h4>
    </Col>
  </Row>
);

SponsorGroup.Body = ({ children }) => <Row>{children}</Row>;

const ImageViewer = (props) => {
  const { images } = props;

  //  Bootstrap 4 has 12 column wide layout
  const LAYOUT_COL_WIDTH = 12;
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        placeContent: "space-between",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "space-between",
        width: "100%",
      }}
    >
      {images.map((image) => {
        return (
          <div
            key={image.name}
            // This percentage dictates how many images are per row; 33% would be 3
            style={{
              width: "40%",
              marginBottom: "3%",
              marginLeft: "2.5%",
              marginRight: "2.5%",
            }}
            className={classNames(
              "mb-3 d-flex align-items-center justify-content-center",
              styles.image
            )}
          >
            <a href={image.website}>
              <Image
                src={image.img}
                style={{
                  // The width here forces all images to fill up 100% of their parent container
                  width: "100%",
                }}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};

const SponsorSection = ({ sponsors }) => {
  const hasAllTiersSection = (sponsors.allTiers || []).length > 0;
  return (
    <div>
      <Section.Title className={styles.sponsorTitle}>Sponsors</Section.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            // The width here definess the size of the container for all tiers of sponsors
            width: "50%",
          }}
        >
          {sponsors.tier1 && sponsors.tier1.length > 0 && (
            <div
              className={classNames({
                [styles.firstTierSection]: !hasAllTiersSection,
              })}
            >
              <ImageViewer images={sponsors.tier1} />
            </div>
          )}

          {sponsors.tier2 && sponsors.tier2.length > 0 && (
            <ImageViewer images={sponsors.tier2} />
          )}

          {sponsors.tier3 && sponsors.tier3.length > 0 && (
            <ImageViewer images={sponsors.tier3} />
          )}

          {sponsors.tier4 && sponsors.tier4.length > 0 && (
            <ImageViewer images={sponsors.tier4} />
          )}

          {hasAllTiersSection && <ImageViewer images={sponsors.allTiers} />}

          {sponsors.diversity && (
            <>
              <ImageViewer images={sponsors.diversity.divTier1} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;
