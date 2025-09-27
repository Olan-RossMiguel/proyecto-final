export default function AuthLayout ({ title, children, footer }) {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='fixed inset-0 -z-20 w-full h-full bg-white dark:bg-gray-950'>
        <svg
          className='absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.07]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <filter id='noise'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.65'
              numOctaves={3}
              stitchTiles='stitch'
            />
            <feColorMatrix type='saturate' values={0} />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,246,228,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent_40%)]'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(253,224,71,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(250,204,21,0.08),transparent_40%)]' />
        </div>
      </div>
      <div className='w-full max-w-md'>
        <div className='backdrop:blur-2xl bg-black/20 rounded-2xl shadow-lg p-8'>
          <h1 className='text-2xl font-bold text-gray-100 mb-6 text-center '>{title}</h1>
          {children}
        </div>
        {footer ? <div className='mt-4 text-center text-sm text-gray-600'>{footer}</div> : null}
      </div>
    </div>
  )
}
