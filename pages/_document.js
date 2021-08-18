import React, { Component } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

// แก้ไข Html แบบกำหนดเอง
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <meta charSet="utf-8" />
        <Head />
        <body className="sidebar-mini layout-fixed control-sidebar-slide-open sidebar-collapse layout-footer-fixed layout-navbar-fixed vscode dark-mode">
          <div className="wrapper">
            <Main />
            <NextScript />
          </div>
          <script src="/js/jquery.min.js"></script>
          <script src="/js/adminlte.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
