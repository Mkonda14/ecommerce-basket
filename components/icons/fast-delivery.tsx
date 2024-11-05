import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export const FastDelivery = ({
  className,
  ...props
}: ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg
      height="800px"
      width="800px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn(
        "absolute w-[calc(100%+1rem)] top-0 left-0 fill-foreground",
        className
      )}
      {...props}
    >
      <path
        className="fill-[#10B981]"
        d="M388.81,102.084H96.029c-4.722,0-9.227,3.829-10.059,8.551L54.306,290.205h25.653
            c9.445,0,15.752,7.656,14.087,17.102c-1.665,9.445-10.673,17.102-20.117,17.102H48.276l-4.523,25.653
            c-0.833,4.722,2.321,8.551,7.043,8.551h301.332l43.725-247.979C396.687,105.912,393.532,102.084,388.81,102.084z"
      />
      <path
        className="fill-[#C7CFE2]"
        d="M475.849,238.899H373.237l-21.109,119.714h136.816l15.078-85.51
            C507.353,254.213,494.739,238.899,475.849,238.899z"
      />
      <path
        className="fill-[#AFB9D2]"
        d="M368.713,264.552h92.636c9.446,0,15.752,7.656,14.087,17.102l-13.57,76.959H352.129L368.713,264.552z
            "
      />
      <path
        className="fill-[#C7CFE2]"
        d="M459.738,136.288h-68.408l-6.031,34.204h94.061l1.508-8.551
            C483.366,147.773,473.905,136.288,459.738,136.288z"
      />
      <polygon
        className="fill-[#B4E6FF]"
        points="475.849,238.899 470.809,170.492 385.299,170.492 373.237,238.899 "
      />
      <path
        className="fill-[#F1F4FB]"
        d="M469.818,273.103h34.204l-6.031,34.204h-17.102c-9.446,0-15.752-7.656-14.087-17.102L469.818,273.103
            z"
      />
      <path
        className="fill-[#959CB5]"
        d="M422.54,298.756c-25.772,0-50.708,14.265-66.084,35.317l-4.327,24.54h127.674
            C481.534,324.877,457.418,298.756,422.54,298.756z"
      />
      <path
        className="fill-[#AFB9D2]"
        d="M468.601,320.412l-6.736,38.202h17.937C480.556,343.925,476.403,330.686,468.601,320.412z"
      />
      <path
        className="fill-[#5B5D6E]"
        d="M453.232,367.164c-4.163,23.612-26.681,42.755-50.294,42.755s-39.379-19.142-35.216-42.755
            c4.163-23.612,26.681-42.755,50.294-42.755C441.629,324.409,457.396,343.552,453.232,367.164z"
      />
      <path
        className="fill-[#9BD6FF]"
        d="M414.979,196.145h57.719l-1.89-25.653h-85.51l-12.062,68.408h25.653l6.031-34.204
            C405.754,199.973,410.257,196.145,414.979,196.145z"
      />
      <path
        className="fill-[#10B981]"
        d="M155.411,298.756c-21.592,0-42.586,10.028-57.877,25.653H73.929H48.276l-4.523,25.653
            c-0.833,4.722,2.321,8.551,7.043,8.551h301.332l6.031-34.204H204.24C194.46,308.785,177.003,298.756,155.411,298.756z"
      />
      <path
        className="fill-[#5B5D6E]"
        d="M186.104,367.164c-4.163,23.612-26.681,42.755-50.294,42.755s-39.379-19.142-35.216-42.755
            c4.163-23.612,26.681-42.755,50.294-42.755S190.267,343.552,186.104,367.164z"
      />
      <path
        d="M503.673,243.579c-5.323-6.344-12.584-10.467-20.908-12.008l-3.91-53.066c3.857-0.037,7.146-2.815,7.818-6.622l1.508-8.551
            c1.616-9.166-0.638-18.214-6.185-24.824c-5.54-6.602-13.651-10.239-22.84-10.239h-58.854l2.865-16.245
            c0.813-4.614-0.365-9.221-3.231-12.637c-2.838-3.382-7.105-5.322-11.707-5.322H98.524c-8.567,0-16.453,6.665-17.954,15.176
            L54.939,254.609c-0.769,4.36,2.143,8.518,6.503,9.286c0.47,0.083,0.938,0.123,1.401,0.123c3.817,0,7.2-2.737,7.885-6.626
            L96.36,112.025c0.169-0.957,1.401-1.927,2.163-1.927l288.702,0.001l-25.481,144.51c-0.769,4.36,2.142,8.518,6.503,9.286
            c4.355,0.767,8.518-2.143,9.286-6.503l1.848-10.479h95.866c0.003,0,0.007,0,0.011,0s0.007,0,0.011,0
            c6.626,0.001,12.351,2.475,16.122,6.969c2.595,3.093,4.109,6.943,4.473,11.202h-26.629c-3.891,0-7.219,2.793-7.895,6.625
            l-3.015,17.102c-1.215,6.89,0.501,13.717,4.707,18.73c4.148,4.945,10.445,7.78,17.274,7.78h7.548l-6.22,35.273h-21.165
            c-1.393-7.055-4.442-13.544-9.063-19.049c-8.199-9.773-20.265-15.154-33.972-15.154c-21.979,0-43.184,14.38-53.111,34.204h-3.223
            l10.403-58.999c0.769-4.36-2.142-8.518-6.503-9.286c-4.358-0.77-8.518,2.142-9.286,6.503l-10.894,61.783H196.418
            c-1.393-7.055-4.442-13.543-9.063-19.049c-8.2-9.773-20.265-15.155-33.973-15.155c-21.979,0-43.184,14.38-53.111,34.204
            l-45.978-0.001l3.204-18.17h36.029c4.427,0,8.017-3.589,8.017-8.017c0-4.427-3.589-8.017-8.017-8.017H8.017
            c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h33.201l-2.865,16.245c-0.813,4.614,0.364,9.221,3.231,12.637
            c2.838,3.382,7.105,5.322,11.707,5.322h41.774c-2.173,13.599,1.093,26.41,9.268,36.151c8.2,9.773,20.265,15.154,33.973,15.154
            c27.284,0,53.387-22.151,58.188-49.38c0.113-0.645,0.202-1.286,0.292-1.926h162.331c-2.174,13.598,1.092,26.409,9.268,36.151
            c8.2,9.773,20.265,15.154,33.973,15.154c27.284,0,53.387-22.151,58.188-49.38c0.113-0.645,0.202-1.286,0.292-1.926h27.525
            c3.891,0,7.219-2.793,7.895-6.625l15.078-85.51C513.382,262.886,510.661,251.907,503.673,243.579z M391.445,178.508h71.336
            l3.859,52.375H382.21L391.445,178.508z M459.157,144.304c4.367,0,8.117,1.602,10.557,4.511c2.529,3.014,3.48,7.181,2.676,11.734
            l-0.34,1.926h-77.78l3.204-18.171H459.157z M180.705,365.773c-3.512,19.923-22.533,36.13-42.399,36.13
            c-8.886,0-16.59-3.348-21.691-9.426c-5.248-6.255-7.248-14.749-5.631-23.919c3.513-19.923,22.533-36.13,42.399-36.13
            c8.886,0,16.59,3.348,21.691,9.427C180.322,348.108,182.322,356.603,180.705,365.773z M444.756,365.773
            c-3.513,19.923-22.533,36.13-42.399,36.13c-8.886,0-16.59-3.348-21.691-9.427c-5.248-6.255-7.248-14.749-5.631-23.919
            c3.512-19.923,22.533-36.13,42.399-36.13c8.886,0,16.59,3.348,21.691,9.427C444.373,348.108,446.373,356.603,444.756,365.773z
            M480.307,299.291c-2.139,0-3.865-0.71-4.992-2.052c-1.169-1.394-1.596-3.397-1.2-5.64l1.848-10.477h17.923l-3.204,18.171h-10.375
            V299.291z"
      />
      <path
        d="M147.352,350.597c-8.567,0-16.453,6.665-17.954,15.176c-0.813,4.614,0.364,9.221,3.231,12.637
            c2.838,3.382,7.105,5.322,11.707,5.322c8.567,0,16.453-6.665,17.954-15.175c0.813-4.615-0.363-9.221-3.23-12.638
            C156.222,352.537,151.955,350.597,147.352,350.597z"
      />
      <path
        d="M411.404,350.597c-8.567,0-16.453,6.665-17.953,15.175c-0.813,4.615,0.363,9.221,3.23,12.638
            c2.838,3.382,7.105,5.322,11.707,5.322c8.567,0,16.453-6.665,17.954-15.175l0,0c0.813-4.615-0.365-9.221-3.231-12.638
            C420.272,352.537,416.006,350.597,411.404,350.597z"
      />
      <path
        d="M323.374,316.393H221.791c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h101.583
            c4.427,0,8.017-3.589,8.017-8.017S327.801,316.393,323.374,316.393z"
      />
      <path
        d="M31.15,298.222h147.886c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017H31.15c-4.427,0-8.017,3.589-8.017,8.017
            S26.722,298.222,31.15,298.222z"
      />
      <path
        d="M94.061,256.001c0,4.427,3.589,8.017,8.017,8.017h198.189l-16.535,10.954c-3.692,2.445-4.701,7.419-2.256,11.11
            c1.542,2.329,4.092,3.59,6.69,3.59c1.52,0,3.058-0.432,4.42-1.335l38.727-25.653c2.092-1.384,3.413-3.668,3.573-6.172
            c0.159-2.503-0.86-4.937-2.759-6.577l-29.68-25.653c-3.35-2.895-8.412-2.527-11.308,0.823c-2.896,3.35-2.527,8.412,0.823,11.308
            l13.388,11.572H102.077C97.65,247.985,94.061,251.574,94.061,256.001z"
      />
    </svg>
  );
};
