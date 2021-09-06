export const HelloWorld = (name: string) => `Hello ${name}`; 

export * from './modules/entities/apps/app.entity'
export * from './modules/entities/apps/apps.service'
export * from './modules/entities/apps/apps.module'

export * from './modules/entities/devices/device.entity'
export * from './modules/entities/devices/devices.service'
export * from './modules/entities/devices/devices.module'

export * from './modules/entities/locations/location.entity'
export * from './modules/entities/locations/locations.service'
export * from './modules/entities/locations/locations.module'

export * from './modules/entities/projects/project.entity'
export * from './modules/entities/projects/projects.service'
export * from './modules/entities/projects/projects.module'

export * from './modules/entities/users/user.entity'
export * from './modules/entities/users/users.service'
export * from './modules/entities/users/user.controller'
export * from './modules/entities/users/users.controller'
export * from './modules/entities/users/users.module'

export * from './modules/entities/workplaces/workplace.entity'
export * from './modules/entities/workplaces/workplaces.service'
export * from './modules/entities/workplaces/workplaces.module'

export * from './modules/authentication/authentication.service'
export * from './modules/authentication/authentication.controller'
export * from './modules/authentication/authentication.module'