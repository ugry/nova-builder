import { useState } from '@wordpress/element';
import { Button, Flex } from '@wordpress/components';

const BREAKPOINTS = [
	{ key: 'desktop', icon: '🖥', label: 'Desktop' },
	{ key: 'tablet',  icon: '📱', label: 'Tablet'  },
	{ key: 'mobile',  icon: '📲', label: 'Mobile'  },
];

export default function ResponsiveControl( { children } ) {
	const [ device, setDevice ] = useState( 'desktop' );

	return (
		<div className="nb-responsive-control">
			<Flex justify="flex-end" style={ { marginBottom: 8 } }>
				{ BREAKPOINTS.map( ( bp ) => (
					<Button
						key={ bp.key }
						isSmall
						isPrimary={ device === bp.key }
						isSecondary={ device !== bp.key }
						onClick={ () => setDevice( bp.key ) }
						title={ bp.label }
					>
						{ bp.icon }
					</Button>
				) ) }
			</Flex>
			{ children( device ) }
		</div>
	);
}
