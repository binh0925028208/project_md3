import Header from "../../components/userHeader/header";
import "./defaultLayout.css";
import Footer from "../../components/userFooter/footer";
import HomeVideo from "../../components/userVideo/homeVideo";

interface Props {
  child: JSX.Element;
}

export default function DefaultLayout(props: Props) {
  return (
    <div className="wrapper_layout">
      <div className="header_layout">
        <Header />
      </div>
      <div className="wrapper_layout_body">
        <div>{props.child}</div>
      </div>
      <div className="footer_layout">
        <HomeVideo />
        <Footer />
      </div>
    </div>
  );
}
