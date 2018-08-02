import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Lightbox from "react-images";
import Measure from "react-measure";
import { images } from "./imagesUrls";
import "./App.css";

const imgSet = images;

class App extends Component {
  state = {
    currentImage: 0,
    lightboxIsOpen: false,
    width: -1
  };

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  render() {
    const { width, currentImage, lightboxIsOpen } = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1 className="title">Lost and Found</h1>
          <h2 className="subtitle">
            The quick brown fox jumped over the lazy fox. What a crazy day!
          </h2>

          <div className="gallery-wrapper">
            <Measure
              bounds
              onResize={contentRect =>
                this.setState({
                  width: contentRect.bounds.width
                })
              }
            >
              {({ measureRef }) => {
                if (width < 1) {
                  return <div ref={measureRef} />;
                }
                let columns = 1;
                if (width >= 480) {
                  columns = 2;
                }
                if (width >= 1440) {
                  columns = 3;
                }
                if (width >= 1824) {
                  columns = 4;
                }
                return (
                  <div ref={measureRef}>
                    <Gallery
                      photos={imgSet}
                      columns={columns}
                      onClick={this.openLightbox}
                    />
                  </div>
                );
              }}
            </Measure>
          </div>
          <Lightbox
            images={imgSet}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={currentImage}
            isOpen={lightboxIsOpen}
            width={1280}
            backdropClosesModal={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
