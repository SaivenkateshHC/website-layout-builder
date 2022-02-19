import { useEditor, useNode } from "@craftjs/core";
import {Grid, Slider} from "@material-ui/core";
import { Paper, FormControl, FormLabel } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import React, { useEffect } from "react";

export const GridItem = ({ background, padding, size, children, ...props }) => {
	const {
		connectors: { connect, drag },
		node,
		actions: { setProp }
	} = useNode((node) => ({ node }));

	const {
		actions: { history }
	} = useEditor();
	const { actions, selectedNodeId } = useEditor((state) => ({
		selectedNodeId: state.events.selected
	}));

	useEffect(() => {
		console.log("adding a custom prop");
		/*setProp((props) => {
		  //props.background = "red";
		  props["data-test"] = true;
		});*/
		history.ignore().setProp(node.id, (props) => {
			//props.background = "red";
			props["data-test"] = true;
		});
	}, []);

	return (
		<Grid item xs={size}
		// <div
		      {...props}
		      // ref={connect}
		      ref={(ref) => connect(drag(ref))}
		      onClick={()=> {

		      }}
		      style={{ margin: "5px 0", background, padding: `${padding}px` }}
		>
			{children}
		</Grid>
	);
};

export const GridItemSettings = () => {
	const {
		background,
		padding,
		size,
		actions: { setProp }
	} = useNode((node) => ({
		background: node.data.props.background,
		padding: node.data.props.padding,
		size:node.data.props.size
	}));

	return (
		<div>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Background</FormLabel>
				<ColorPicker
					name="background-color"
					value={background}
					onChange={(color) => {
						setProp((props) => (props.background = color), 500);
					}}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Padding</FormLabel>
				<Slider
					defaultValue={padding}
					onChange={(_, value) =>
						setProp((props) => (props.padding = value), 500)
					}
				/>
			</FormControl>
			<FormControl fullWidth={true} margin="normal" component="fieldset">
				<FormLabel component="legend">Size</FormLabel>
				<Slider
					defaultValue={size}
					onChange={(_, value) =>
						setProp((props) => (props.size = value), 500)
					}
				/>
			</FormControl>
		</div>
	);
};

export const GridItemDefaultProps = {
	background: "#ffffff",
	padding: 3,
	size:12
};

GridItem.craft = {
	props: GridItemDefaultProps,
	related: {
		settings: GridItemSettings
	}
};
