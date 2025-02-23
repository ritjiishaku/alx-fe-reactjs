const Footer = () => {
    return (
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
      </footer>
    );
  };
  
  const styles = {
    footer: {
      textAlign: "center",
      padding: "10px",
      backgroundColor: "#333",
      color: "#fff",
      marginTop: "20px",
    },
  };
  
  export default Footer;
  