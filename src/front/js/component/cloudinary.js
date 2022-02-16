import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
    componentDidMount() {
        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.CLOUD_NAME,
                uploadPreset: this.props.preset,
                apiKey: process.env.API_KEY,
                language: "en",
                sources: ["local", "camera"],
                showAdvancedOptions: false,
                cropping: true,
                multiple: true,
                defaultSource: "local",
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    actions.saveImageInfo(
                        result.info.url,
                        result.info.public_id
                    );
                }
            }
        );
        document.getElementById("upload_widget").addEventListener(
            "click",
            function () {
                myWidget.open();
            },
            false
        );
    }

    render() {
        return (
            <button id="upload_widget" className="cloudinary-button">
                Upload
            </button>
        );
    }
}

export default CloudinaryUploadWidget;
