import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  height: ${(props) => props.theme.main.sizes.leftMenu.height};

  .leftMenuHeaderLink {
    &:hover {
      text-decoration: none;
    }
    padding-left: 2rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont;
    display: flex;
    align-items: center;
    width: 100%;
    height: ${(props) => props.theme.main.sizes.leftMenu.height};
    font-size: 24px;
    color: #fff;

    background: #10b982;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        leftMenu: {},
      },
      sizes: {
        header: {},
        leftMenu: {},
      },
    },
  },
};

Wrapper.propTypes = {
  theme: PropTypes.object,
};

export default Wrapper;
